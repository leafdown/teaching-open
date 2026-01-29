setlocal

SET SCRIPT_DIR=%~dp0
SET ROOT_DIR=%SCRIPT_DIR%..

echo build api ...
docker build -t "teaching-open-api:builder" -f "%ROOT_DIR%\api\Dockerfile.builder" "%ROOT_DIR%\api"
docker run --rm -v "%ROOT_DIR%\api:/workspace" -w /workspace teaching-open-api:builder bash -c "cd /workspace && mvn clean package"
docker build -t "registry.cn-shanghai.aliyuncs.com/goodat/teaching-open-api:latest" -f "%ROOT_DIR%\api\Dockerfile" "%ROOT_DIR%\api"


echo build web ...
docker build -t "teaching-open-web:builder" -f "%ROOT_DIR%\web\Dockerfile.builder" "%ROOT_DIR%\web"
docker run --rm -v "%ROOT_DIR%\web:/workspace" -w /workspace teaching-open-web:builder bash -c "cd /workspace && yarn && yarn build"
docker build -t "registry.cn-shanghai.aliyuncs.com/goodat/teaching-open-web:latest" -f "%ROOT_DIR%\web\Dockerfile" "%ROOT_DIR%\web"
