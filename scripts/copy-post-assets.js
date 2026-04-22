const fs = require('node:fs');
const path = require('node:path');

async function pathExists(targetPath) {
  try {
    await fs.promises.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function copyDirectory(sourceDir, destinationDir) {
  await fs.promises.mkdir(destinationDir, { recursive: true });
  const entries = await fs.promises.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
      continue;
    }

    await fs.promises.copyFile(sourcePath, destinationPath);
  }
}

function resolvePostOutputDir(publicRoot, postPath) {
  const normalizedPath = postPath.replace(/\\/g, '/');

  if (normalizedPath.endsWith('/index.html')) {
    return path.join(publicRoot, path.dirname(normalizedPath));
  }

  if (normalizedPath.endsWith('.html')) {
    const parentDir = path.dirname(normalizedPath);
    const fileName = path.basename(normalizedPath, '.html');
    return path.join(publicRoot, parentDir, fileName);
  }

  return path.join(publicRoot, normalizedPath);
}

hexo.extend.filter.register('after_generate', async () => {
  const posts = hexo.locals.get('posts').toArray();
  const sourceRoot = path.resolve(hexo.source_dir);
  const publicRoot = path.resolve(hexo.public_dir);
  let copiedFiles = 0;

  for (const post of posts) {
    const sourceFilePath = path.join(sourceRoot, post.source);
    const sourceDir = path.dirname(sourceFilePath);
    const sourceFileName = path.basename(sourceFilePath, path.extname(sourceFilePath));
    const assetFolderName = `${sourceFileName}.assets`;
    const sourceAssetDir = path.join(sourceDir, assetFolderName);

    if (!(await pathExists(sourceAssetDir))) {
      continue;
    }

    const postOutputDir = resolvePostOutputDir(publicRoot, post.path);
    const destinationAssetDir = path.join(postOutputDir, assetFolderName);
    await copyDirectory(sourceAssetDir, destinationAssetDir);

    const entries = await fs.promises.readdir(sourceAssetDir, { withFileTypes: true });
    copiedFiles += entries.filter(entry => entry.isFile()).length;
  }

  if (copiedFiles > 0) {
    hexo.log.info(`Post assets copied: ${copiedFiles}`);
  }
});
