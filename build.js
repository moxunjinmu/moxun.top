// 构建脚本，用于禁用Node.js的警告
import { execSync } from 'child_process';

try {
  console.log('开始构建项目（已禁用警告）...');
  // 使用--no-warnings标志运行nuxt build命令
  execSync('node --no-warnings ./node_modules/.bin/nuxt build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--no-warnings'
    }
  });
  console.log('构建完成！');
} catch (error) {
  console.error('构建失败:', error);
  process.exit(1);
}
