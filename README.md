# Job Search FE

ECNU SEI - Advanced Programming (Fall 2021) homework.

## Run

```bash
npm install
npm run dev
```

## API

### Entry Model

1. User Info 用户信息

    ```typescript
    interface UserInfo {
        // 公共属性
        username:   string;               // 用户名, 唯一 id
        name:       string;               // 用户真实姓名, 用于个人信息展示
        role:       string:               // 用户角色, 有 "job_hunter", "recruiter", "not_logged" 三种
        email:      string:               // 用户邮箱

        // 求职者属性
    jobType:     string;               // 期望职位
    jobTag:      string[] | null;      // 职位标签 (可选), 如 ["Java", "Golang"]
    city:        string;               // 期望城市
    salaryRange: number[];             // 期望薪资范围, 格式为长度为2的数组, 如 [3, 15] 表示期望薪资为 3k-15k
    userType:    'campus' | 'society'; // 求职者类型, 区分校招与社招

    // 招聘者属性
    company:    string;                // 公司名称
    department: string;                // 部门名称
    }
    ```

