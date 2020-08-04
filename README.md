![.github/workflows/backendProjectLvl2.yml](https://github.com/alexandertolchinsky/backend-project-lvl2/workflows/.github/workflows/backendProjectLvl2.yml/badge.svg?event=push)
[![Maintainability](https://api.codeclimate.com/v1/badges/36760a57970be6fd2dd2/maintainability)](https://codeclimate.com/github/alexandertolchinsky/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/36760a57970be6fd2dd2/test_coverage)](https://codeclimate.com/github/alexandertolchinsky/backend-project-lvl2/test_coverage)
# Utility to find differences in configuration files
## About The Project
This is a training project in which I implemented a utility to find differences in configuration files.

The capabilities of the utility:
1) Support for different formats
2) Report generation in plain text, stylish and json

## Getting Started
### Installation
1. Clone the repo
```sh 
git clone https://github.com/alexandertolchinsky/backend-project-lvl2.git
```
2. Install package locally
```sh
npm link
```
## How to run
compare files, output  in stylish format 
```sh 
gendiff file1.json file2.ini
```
compare files, output  in plain format 
```sh 
gendiff -f plain file1.json file2.json
```
compare files, output  in JSON format 
```sh 
gendiff -f json  file1.json file2.yml
```

## Usage
### Example of compare json files, output in the "stylish" format
[![asciicast](https://asciinema.org/a/C4NmK3wCU8BYnpcS1U7fa96MF.svg)](https://asciinema.org/a/C4NmK3wCU8BYnpcS1U7fa96MF)

### Example of compare yaml files, output in the "stylish" format
[![asciicast](https://asciinema.org/a/Nlx1ihdpqDBSJA5qzMa5IydrX.svg)](https://asciinema.org/a/Nlx1ihdpqDBSJA5qzMa5IydrX)

### Example of compare ini files, output in the "stylish" format
[![asciicast](https://asciinema.org/a/jtpOnHBe306U0rzCO65tlsiB4.svg)](https://asciinema.org/a/jtpOnHBe306U0rzCO65tlsiB4)

### Example of recursive compare json files, output in the "stylish" format
[![asciicast](https://asciinema.org/a/MrAUYZ1vic3vzheSmElFEozxS.svg)](https://asciinema.org/a/MrAUYZ1vic3vzheSmElFEozxS)

### Example of recursive compare json files, output in the "plain" format
[![asciicast](https://asciinema.org/a/cpumtV5L6JxFxdPAoahIf4BtA.svg)](https://asciinema.org/a/cpumtV5L6JxFxdPAoahIf4BtA)

### Example of recursive compare json files, output in the "json" format
[![asciicast](https://asciinema.org/a/OgTu5sKzapnzm5d5hJpw6XRhr.svg)](https://asciinema.org/a/OgTu5sKzapnzm5d5hJpw6XRhr)

## Contact
Alexander Tolchinsky - alexander.tolchinsky@gmail.com

Project Link: [https://github.com/alexandertolchinsky/backend-project-lvl2](https://github.com/alexandertolchinsky/backend-project-lvl2)
## Acknowledgements
* [Lodash](https://lodash.com)
* [Node.js](https://nodejs.org)
* [Commander.js](https://github.com/tj/commander.js)
* [JS-YAML](https://github.com/nodeca/js-yaml)
* [ini](https://github.com/npm/ini)








