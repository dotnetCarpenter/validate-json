# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- CHANGELOG

### Fixed
- Set correct nodejs version in package.json e0db85f
### Removed
- The `-V` alias option for displaying version 427bdf9

## [1.3.0] - 2016-12-15
### Changed
- Option order to not matter 3b833e4
- Set minimum nodejs version to 7.0 because of `Object.entries` usage, since 1.1.0. 0520dcb

### Fixed
- Exit delay while waiting for data stream 02e273b
- Bug where errors at position 0 would couse an infinite loop 0fc884c

## [1.2.0] - 2016-12-14
### Added
- Documentation to [README](./README.md) 9ba32ec, 4205160
- CI tests on Appveyor f8f8e23

## [1.1.3] -  2016-12-14
### Fixed
`npm home` & `npm issue` - wrong links in package.json 00246e4

## [1.1.2] - 2016-12-14
### Added
- CI test on travis b4cd506

### Changed
- Package name to `valid-json-cli` b4cd506

### Fixed
- Set minimum node version to 6.8 because of default parameters usage, since 1.1.0. 0520dcb

## [1.1.1] - 2016-12-14
### Fixed
- Graphical error hinting 24d086c

## [1.1.0] - 2016-12-12
### Added
- Support for supplying a file path d4da288
- Support for file-name 70f506b
- CLI now has silent, help and version option b9a89b7

### Changed
- 500 miliseconds exit delay while waiting for data stream b9a89b7
- Changed name since validate-json is already taken - validjson is also easier to type 947c16d

## [1.0.0] - 2016-12-12
### Added
- Initial implementation 4c87849

[Unreleased]: https://github.com/dotnetCarpenter/validate-json/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/dotnetCarpenter/validate-json/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/dotnetCarpenter/validate-json/compare/v1.1.3...v1.2.0
[1.1.3]: https://github.com/dotnetCarpenter/validate-json/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/dotnetCarpenter/validate-json/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/dotnetCarpenter/validate-json/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/dotnetCarpenter/validate-json/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/dotnetCarpenter/validate-json/releases/tag/v1.0.0
