export default (api) => {
  // stats obj 别打stdio
  api.onBuildSuccess(({ stats }) => {
    require('child_process').execSync(`cp  -r ./static ./dist`, {
      cwd: process.cwd()
    })
    require('child_process').execSync(`../node_modules/http-server/bin/http-server -p 4444`, {
      cwd: require('path').resolve(process.cwd(), './dist'),
      stdio: 'inherit'
    })
  });
}