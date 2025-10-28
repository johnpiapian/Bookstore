#!/usr/bin/env bash
set -euo pipefail # exit on error, undefined variable, or failed pipe

VENV_DIR="env"

# python 3.14 introduces breaking changes that are not yet supported by some libraries.
PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
if (( $(echo "$PYTHON_VERSION >= 3.14" | bc -l) )); then
    if command -v python3.13 &> /dev/null; then
        echo "Python 3.14 or greater detected. Using python3.13 instead."
        # Create a virtual environment
        python3.13 -m venv "$VENV_DIR"
    else
        echo "Error: Python version 3.14 or greater detected, and python3.13 is not installed."
        exit 1
    fi
fi

# create venv, exit on failure
# python3 -m venv "$VENV_DIR"

# activate the venv (exit on failure)
source "$VENV_DIR/bin/activate"

# ensure pip upgrade succeeds before continuing
pip install --upgrade pip

# install requirements (uncomment if you have requirements.txt)
# pip install -r requirements.txt
# pip install black isort flake8
# pip install uvicorn motor pydantic-settings python-dotenv

# install additional packages only if previous commands succeeded
pip install "fastapi[standard]" pydantic-settings motor

# cleanup
deactivate