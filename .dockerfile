# Ignore node_modules folder (it will be handled by Docker and copied from the builder stage)
node_modules

# Ignore build files and directories
build
dist
out

# Ignore potential sensitive or unused files and directories
database
cli

# Ignore lock files and temp files
*-lock.json
*-lock

# Ignore Git, VSCode, and other local development files
.git
.vscode

# Ignore Dockerfile and README as they are not required in the final build
Dockerfile
README.md
