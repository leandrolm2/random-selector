# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2017-06-20
### Added
- controller and routes to tags
### Changed
### routes user
  
| http method   |  old routes  |  new routes  |
| :-----------  | :----------- |  :---------- |
|  post         | /create_user |  /user       |
|  post         | /user/login  |  /user/login |
|  put          | /update_user |  /user       |
|  delete       | /delete_user |  /user       |

### routes category
  
| http method   |  old routes                    |  new routes            |
| :------------ | :----------------------------- |  :-------------------- |
|  post         | /create_category               |  /category             |
|  get          | /get_categories                |  /category             |
|  put          | /get_categories                |  /category/:category   |
|  delete       | /delete_category/:category     |  /category/:category   |

### routes tags
  
| http method   |  old routes                    |  new routes            |
| :------------ | :----------------------------- |  :-------------------- |
|  post         | /create_tag                    |  /tag                  |
|  delete       | /delete_tag/:tag/:category     |  /tag/:tag/:category   |
|  get          | /get_tags/:category            |  /tag/:category        |
|  put          | /get_tags/:category            |  /tag/:category        |
|  get          | /randomTag_tag/:category       |  /ramdomTag/:category  |

### Removed
## [Unreleased]

## [0.3.0] - 2017-06-20
### Added
- added random select route | controller and update readme
## [Unreleased]

## [0.2.0] - 2017-06-20
### Added
- controller and routes to tags
- controller delete and update user
- tag and category update method
## [Unreleased]
* tags controller
* category controller
- update

## [0.1.0] - 2017-06-20
### Added
- controller and routes to tags
### Changed
- Fixed bugs on categoryController
### Removed
## [Unreleased]
* tags controller
- delete
- change
- get all
## [0.0.2] - 2017-06-20
### Added
- controller and routes to tags and category
### Changed
- response from token when calling them
- relation of tables user and categories
### Removed
- route and method validator
## [Unreleased]
* tags controller
- create
- delete
- change
- get all
## [0.0.1] - 2017-06-20
### Added
- authenticate token
- login route
- validade route
### Changed
- changed column name to usarname
### Removed