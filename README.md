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
        avatarUrl?:     string;     // 头像链接地址 
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

    /**
     * 用户投递信息
     */
    export interface JobRecord {
        title:      string;             // 职位名称
        id:         string;             // 职位 ID
        postTime:   string;             // 发布时间 (UTC+8), 约定格式为 YYYY-MM-dd HH:mm
        sendTime:   string;             // 投递时间 (UTC+8), 约定格式为 YYYY-MM-dd HH:mm
        company:    string;             // 公司名称
        department: string;             // 职位所在部门
        location:   string | string[];  // 工作地点
        status:     'read' | 'unread';  // 当前状态, 区分简历是否被对应 recruiter 下载
    }
    ```

### Ajax API

#### 用户登录

**简述**

| 说明                       | 请求路径    |
| -------------------------- | ----------- |
| 提交登录表单, 返回用户信息 | /user/login |

**Request**

| 属性名称 | 属性类型 | 备注                    |
| -------- | -------- | ----------------------- |
| username | string   | 用户名 (用户的唯一标识) |
| password | string   | 登录密码                |

**Response**

| 属性名称    | 属性类型 | 备注                                                |
| ----------- | -------- | --------------------------------------------------- |
| username    | string   | 用户名                                       |
| role        | string   | 用户角色, 求职者 (job_hunter) 或 招聘者 (recruiter) |
| name        | string   | 用户姓名                                      |
| phoneNumber | string   | 电话号码                                      |
| email       | string   | 电子邮箱                                      |
| jobType     | string   | 用户期望寻求的职位类型                          |
| jobTag      | string[] | 用户职业标签                             |
| university  | string   | 毕业院校                                      |
| education   | string   | 最高学历                                      |
| city        | string   | 期望工作城市                                  |
| salaryRange | number[] | 期待薪资范围, 格式为长度为 2 的数组, 单位为千 (k), 例: [1, 5] 表示 1k-5k                                             |
| userType    | string   | 用户类型, 校招 (campus) 或 社招 (society)      |
| resumeUrl   | string   | 简历链接, 若未上传则为空字符串                   |
| avatarUrl   | string   | 头像链接, 若未上传则为空字符串                   |
| company     | string   | 公司名称                                      |
| department  | string   | 招聘者所在部门                                 |

用户名不能存在或密码错误请求失败

#### 用户注册

**简述**

| 说明                                                     | 请求路径       |
| -------------------------------------------------------- | -------------- |
| 提交基本注册表单, 内容为求职者和招聘者公有属性, 完成注册 | /user/register |

**Request**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| username | string | 用户名, 若已存在该用户名, 则注册失败，返回错误 |
| password | string | 账户密码 |
| name | string | 用户姓名 |
| phoneNumber | string | 电话号码 |
| email | string | 电子邮箱 |
| role | string | 用户类型, 求职者 (job_hunter) 或招聘者 (recruiter) |

**Response**

只需返回成功或失败

#### 密码修改

| 说明                                                     | 请求路径       |
| -------------------------------------------------------- | -------------- |
| 提交旧密码与新密码, 将用户密码修改 | /user/update_password |

**Request**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| username | string | |
| prev_password | string | 账户旧密码, 若密码验证不通过则请求错误 |
| new_password | string | 新密码 |

**Response**

只需返回成功或失败

#### 用户信息更新

**简述**

| 说明                                                     | 请求路径       |
| -------------------------------------------------------- | -------------- |
| 提交新的用户信息, 变更用户信息. username, name, role 无法改变 | /user/update_info |

**Request**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| username | string | |
| phoneNumber | string | |
| email | string | |
| jobType | string | |
| jobTag | string[] | |
| university | string | |
| education | string | |
| salaryRange | number | |
| userType | string | |
| company | string | |
| department | string | |

**Response**

更改成功后返回新的用户信息, 格式同 `/user/login` response

#### 头像上传

**简述**

| 说明                                                     | 请求路径       |
| -------------------------------------------------------- | -------------- |
| 上传用户头像文件, 返回图片静态链接 | /user/upload_avatar |

**Request**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| username | string | |
| avatar | File | 头像图片文件 |

**Response**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| avatarUrl | string | 头像静态链接 |

#### 简历上传

**简述**

| 说明                                                     | 请求路径       |
| -------------------------------------------------------- | -------------- |
| 上传用户简历文件, 返回简历静态链接 | /user/upload_resume |

实现与头像上传基本相同

**Request**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| username | string | |
| resume | File | 简历文件 (PDF) |

**Response**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| resumeUrl | string | 简历文件静态链接 |

#### 获取推荐职位

**简述**

| 说明                                                     | 请求路径       |
| -------------------------------------------------------- | -------------- |
| 获取推荐给当前用户的职位信息 | /user/recommend_jobs |

**Request**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| username | string | |

**Response**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| recommendJobList | JobPosition[] | 推荐职位列表 |

`JobPosition` 类型见 **FE Entry Modal**

#### 获取已收藏的职位

**简述**

| 说明                                                     | 请求路径       |
| -------------------------------------------------------- | -------------- |
| 获取当前用户收藏的职位 | /user/job_stars |

**Request**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| username | string | |

**Response**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| jobStarList | JobPosition[] | 收藏职位列表 |

`JobPosition` 类型见 **FE Entry Modal**

#### 获取投递记录

**简述**

| 说明                                                     | 请求路径       |
| -------------------------------------------------------- | -------------- |
| 获取当前用户已投递的职位记录 | /user/job_records |

**Request**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| username | string | |

**Response**

| 属性名称 | 属性类型 | 备注 |
| ------- | -------- | ---- |
| jobRecordList | JobRecord[] | 投递记录列表 |

`JobRecord` 类型见 **FE Entry Modal**
