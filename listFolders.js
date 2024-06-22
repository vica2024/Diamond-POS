import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// 获取指定目录中的文件夹列表，排除 node_modules
function listFoldersInDirectory(directory) {
    return readdirSync(directory).filter(file => {
        const fullPath = join(directory, file);
        return statSync(fullPath).isDirectory() && ['.git','node_modules'].includes(file)===false;
    });
}

// 递归列出当前目录及其子目录中的文件夹
function listFoldersRecursive(directory, level = 0) {
    const folders = listFoldersInDirectory(directory);
    let markdown = '';

    folders.forEach(folder => {
        const folderPath = join(directory, folder);
        markdown += `${'  '.repeat(level)}- ${folder}\n`;
        markdown += listFoldersRecursive(folderPath, level + 1);
    });

    return markdown;
}

// 主函数
function main() {
    const directory = process.cwd(); // 当前工作目录
    const markdown = listFoldersRecursive(directory);

    if (markdown) {
        console.log("Markdown format:\n");
        console.log(markdown);
    } else {
        console.log("No folders found in the directory.");
    }
}

main();
