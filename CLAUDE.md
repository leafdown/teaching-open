# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Teaching 在线教学平台 — a STEAM education platform for institutions/schools, integrating CRM, coursework, homework, exam banks, competitions, community, and article systems. Version 2.8.

## Build & Development Commands

### Backend (Java / Spring Boot)

```bash
cd api
mvn clean package                  # Build (skip tests)
mvn clean package -DskipTests=false # Build with tests
mvn test -pl jeecg-boot-module-system  # Run only system module tests
```

- **JDK**: 1.8 required, configured for `jdk1.8.0_301` on macOS
- **Entry point**: `api/jeecg-boot-module-system/.../org/jeecg/JeecgApplication.java`
- **Active profile** defined in `application.yml`: `spring.profiles.active: prod`
- **API docs**: Swagger-UI at `/doc.html` when running

### Frontend (Vue 2 + Ant Design Vue)

```bash
cd web
yarn install       # or npm install
yarn run serve     # Dev server on port 443, proxies /api to teacher.lanqu.vip
yarn run build     # Production build to web/dist/
yarn run lint      # ESLint
```

- **Node**: v12 required
- **Dev server** proxies `/api` to `https://teacher.lanqu.vip`
- Webpack aliases: `@` → `src`, `@api` → `src/api`, `@comp` → `src/components`, `@views` → `src/views`

## Architecture

### Backend (Maven multi-module)

```
api/
├── pom.xml                          # Parent POM (jeecg-boot-parent), manages all deps
├── jeecg-boot-base-common/          # Shared utilities, constants, API wrappers
│   └── src/main/java/org/jeecg/common/
│       ├── api/                     # REST client wrappers
│       ├── aspect/                  # AOP aspects
│       ├── constant/                # Global constants
│       ├── exception/               # Exception handling
│       ├── system/                  # System-level shared code
│       └── util/                    # Common utilities
└── jeecg-boot-module-system/        # Main module — all business logic
    └── src/main/java/org/jeecg/
        ├── JeecgApplication.java    # Spring Boot entry point (@EnableSwagger2)
        ├── config/                  # ShiroConfig, Swagger config, etc.
        └── modules/
            ├── system/              # System management: users, roles, permissions, menus, dicts
            ├── teaching/            # Core teaching domain (largest module)
            ├── monitor/             # System monitoring panels
            ├── message/             # Messaging/notifications
            ├── ngalain/             # NgAlain admin panel integration
            ├── quartz/              # Scheduled job management
            └── oss/                 # Object storage (local/qiniu/aliyun)
```

**Layer pattern** (within each module, e.g., `teaching/`):
- `controller/` — REST endpoints
- `service/` + `service/impl/` — `I*Service` interfaces + implementations
- `mapper/` + `mapper/xml/` — MyBatis-Plus mappers + XML SQL
- `entity/` — Database entities
- `model/` — DTOs/request models
- `vo/` — View objects (responses)
- `enums/` — Enumerations

### Frontend (Vue 2 + Ant Design Vue + Vuex)

```
web/src/
├── main.js             # App bootstrap: loads sysConfig + menus, then mounts Vue
├── App.vue
├── permission.js       # Route guard — fetches async routes from API, merges with router
├── router/
│   └── index.js        # Router instance, routes defined in config/router.config.js
├── config/
│   └── router.config.js  # constantRouterMap (static routes) + asyncRouterMap
├── store/
│   ├── index.js
│   └── modules/
│       ├── app.js      # Theme, layout, sidebar state
│       ├── user.js     # Auth token, user info
│       ├── permission.js # Dynamic route management
│       └── enhance.js
├── api/                # API client functions (axios)
│   ├── index.js
│   ├── login.js
│   ├── manage.js       # System management APIs
│   └── GroupRequest.js
├── components/
│   ├── jeecg/          # Jeecg framework components (JEditableTable, etc.)
│   ├── dict/           # Dictionary components (JDictSelectTag)
│   └── layouts/        # UserLayout, TabLayout, RouteView, PageView
└── views/
    ├── account/        # Student center (center/, course/, settings/)
    ├── teaching/       # Admin: course mgmt, work mgmt, news, assets, orders
    ├── system/         # Admin: user/role/permission/class/dict/menu/config mgmt
    ├── home/           # Public-facing pages (index, community, Scratch/Python IDE)
    └── user/           # Login, register, password reset
```

### Key Technologies

- **Backend**: SpringBoot 2.1.3, MyBatis-Plus 3.1.2, Shiro 1.7.0 + JWT 3.7.0 (stateless auth), Druid connection pooling, Swagger-ui, Quartz scheduler, Freemarker templates
- **Frontend**: Vue 2.6, Ant Design Vue 1.6, Vuex 3.1, Vue Router 3.0
- **Storage**: Redis (session/cache), MySQL 5.6+, Qiniu/aliyun OSS/local file storage, MinIO
- **Auth flow**: Shiro + JWT stateless — token in `X-Access-Token` header, ShiroRealm validates, excluded URLs configured via `jeecg.shiro.excludeUrls`
- **Database**: `lower_case_table_names=1` required. `api/db/teachingopen2.8.sql` is full schema; `update2.x.sql` are incremental migrations

### Deployment Context

- Jar and `application-*.yml` are deployed together. YML files in the same directory as the jar take precedence.
- Nginx serves frontend static files and reverse-proxies `/api` to `:8080`
- Default accounts: `admin` / `teacher` / `student`, all password `123456`
- Upload storage type (`local` / `qiniu` / `aliyun`) configured via `jeecg.uploadType`
- `sample/` contains Skulpt-based Python IDE assets for the online Python Turtle environment
- `pythonide/` contains a separate Pyodide-based Python IDE (independent service)
