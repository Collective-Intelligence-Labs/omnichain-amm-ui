# omnichain-amm-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Instal Brew

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
touch ~/.zshrc
export PATH=/opt/homebrew/bin:$PATH
source ~/.zshrc

## Install Protobuff

brew install protobuf


## Create scheme files for proto

go into Proto files folder

protoc --js_out=import_style=commonjs,binary:./ event.proto

protoc --js_out=import_style=commonjs,binary:./ command.proto