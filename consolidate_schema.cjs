const fs = require('fs');
const path = require('path');

const functionsPath = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\b5856b5b-0af1-4a84-a332-59db54059549\\.system_generated\\steps\\392\\output.txt';
const triggersPath = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\b5856b5b-0af1-4a84-a332-59db54059549\\.system_generated\\steps\\399\\output.txt';
const tablesPath = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\b5856b5b-0af1-4a84-a332-59db54059549\\.system_generated\\steps\\410\\output.txt';

function extractData(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const outer = JSON.parse(raw);
    const text = outer.result;
    const startIdx = text.indexOf('[');
    const endIdx = text.lastIndexOf(']') + 1;
    if (startIdx === -1 || endIdx === 0) throw new Error('Could not find JSON array in ' + filePath);
    const jsonStr = text.substring(startIdx, endIdx);
    return JSON.parse(jsonStr);
}

const functions = extractData(functionsPath);
const triggers = extractData(triggersPath);
const tables = extractData(tablesPath);

let sql = '-- SUPABASE REMOTE SYNC (GENERATED VIA MCP)\n\n';

// 1. Tables (Reconstruction)
const tableNames = [...new Set(tables.map(t => t.table_name))];
tableNames.forEach(name => {
    sql += `-- Table: ${name}\n`;
    sql += `CREATE TABLE IF NOT EXISTS public."${name}" (\n`;
    
    const columns = tables.filter(t => t.table_name === name);
    const colLines = columns.map(c => {
        let line = `    "${c.column_name}" ${c.data_type}`;
        if (c.is_nullable === 'NO') line += ' NOT NULL';
        if (c.column_default) line += ` DEFAULT ${c.column_default}`;
        return line;
    });
    
    sql += colLines.join(',\n');
    sql += '\n);\n\n';
});

// 2. Functions
sql += '\n-- FUNCTIONS --\n';
functions.forEach(f => {
    sql += f.definition + ';\n\n';
});

// 3. Triggers
sql += '\n-- TRIGGERS --\n';
triggers.forEach(t => {
    sql += t.definition + ';\n\n';
});

fs.writeFileSync('supabase/migrations/20260409183000_remote_sync.sql', sql);
console.log('Generated migration file.');
