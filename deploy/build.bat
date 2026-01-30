setlocal

SET SCRIPT_DIR=%~dp0
SET ROOT_DIR=%SCRIPT_DIR%..

echo build db ...
docker build -t "registry.cn-shanghai.aliyuncs.com/goodat/teaching-open-db:latest" -f "%ROOT_DIR%\api\Dockerfile.db" "%ROOT_DIR%\api"

@REM echo build api ...
@REM docker build -t "teaching-open-api:builder" -f "%ROOT_DIR%\api\Dockerfile.builder" "%ROOT_DIR%\api"
@REM docker run --rm -v "%ROOT_DIR%\api:/workspace" -w /workspace teaching-open-api:builder bash -c "cd /workspace && mvn clean package"
@REM docker build -t "registry.cn-shanghai.aliyuncs.com/goodat/teaching-open-api:latest" -f "%ROOT_DIR%\api\Dockerfile" "%ROOT_DIR%\api"

@REM echo build web ...
@REM docker build -t "teaching-open-web:builder" -f "%ROOT_DIR%\web\Dockerfile.builder" "%ROOT_DIR%\web"
@REM docker run --rm -v "%ROOT_DIR%\web:/workspace" -w /workspace teaching-open-web:builder bash -c "cd /workspace && yarn && yarn build"
@REM docker build -t "registry.cn-shanghai.aliyuncs.com/goodat/teaching-open-web:latest" -f "%ROOT_DIR%\web\Dockerfile" "%ROOT_DIR%\web"