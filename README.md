# Job Search FE

ECNU SEI - Advanced Programming (Fall 2021) homework.

## Run

```bash
npm install
npm run dev
```

## Development Docs

### FE Entry Model (Work in Progress)

1. User Info 用户信息

    ```typescript
    /**
     * 用户基本信息
     */
    export interface UserInfo {
        username:       string;     // 用户名，用户的唯一标识
        role:           Role;       // 用户角色, 区分为未登录 (not_logged), 求职者 (job_hunter), 招聘者 (recruiter) 三种
        name:           string;     // 真实姓名
        phoneNumber:    string;     // 电话号码
        email:          string;     // 邮箱地址
    }

    /**
     * 求职者
     */
    export interface JobHunterInfo extends UserInfo {
        jobType:        string;     // 用户期望寻求的职位类型
        jobTag?:        string[];   // 求职标签
        university:     string;     // 毕业院校
        education:      string;     // 最高学历
        city:           string;     // 期望工作城市
        salaryRange:    number[];   // 期望薪资范围, 单位为千 (k), 例: [1, 5] 表示 1k-5k
        userType:       string;     // 求职类型, 分为校招 ('campus') 和社招 ('society')
        resumeUrl?:     string;     // 简历链接地址 (可选)
    }

    /**
     * 招聘者
     */
    export interface RecruiterInfo extends UserInfo {
        company:        string;     // 所在公司名称
        department:     string;     // 所在部门名称
    }
    ```

2. Company and JobPosition Info 公司和职位信息

    ```typescript
    /**
     * 公司信息
    */
    export interface Company {
        name:           string;             // 公司名称, 是公司的唯一标识
        description:    string;             // 简介
        logoUrl:        string;             // Logo 链接
        officialLink:   string;             // 官网地址
        location:       string | string[];  // 地点, 可以为多个或单个地点
        jobNumber:      number;             // 在招职位数
    }

    /**
     * 职位信息
     */
    export interface JobPosition {
        title:                  string;             // 职位名称
        id:                     string;             // 职位 ID, 职位唯一标识
        postTime:               string;             // 发布时间 (UTC+8), 约定格式为 YYYY-MM-dd HH:mm
        location:               string | string[];  // 工作地点
        experienceRequirement?: string;             // 经验要求 (可选), 若为空则表示不限
        educationRequirement?:  string;             // 学历要求 (可选), 若为空则表示不限
        salaryRange:            number[];           // 薪资范围, 与 JobHunterInfo 中 salaryRange 格式相同
        company:                string;             // 公司名称
        department:             string;             // 职位所在部门
        logoUrl:                string;             // 公司 Logo 链接
    }
    ```

### Ajax API

No Progress
