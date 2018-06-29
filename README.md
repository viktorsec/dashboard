# Dashboard

A modular dashboard for Ruzinovsky Habbitat monitoring.

## Development

1. `git clone https://github.com/viktorsec/dahsboard.git`
2. `yarn` to install dependencies
3. `yarn start` to start dev environment

You will need Node and Yarn. If you don't already have them, do this on macOS:

1. Get Homebrew package manager: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. Install Node: `brew install node`
3. Install Yarn: `brew install yarn`

## Deployment

### Local network

1. `yarn global add serve` (install serve)
2. `yarn run build` (build)
3. `serve -s build` (deploy)

Your app will be available on your network on `{HOST_IP}:5000`.

### Remote development environment

1. Get [Now](https://zeit.co/download)
2. `yarn run build`
3. `cd build && now --public`

### Production

1. `yarn run build`
2. Copy static build files to ftp server.

## Testing

1. `yarn test`

## Design

Based on [One Dark Vivid Pro](https://atom.io/themes/one-dark-pro-vivid-syntax) theme for VS Code.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). See [readme](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).