# acc-server-web

acc-server-web is a Docker-based project that packages an Assetto Corsa Competizione (ACC) server running under Wine alongside a Next.js web application. The web UI lets you edit server configuration files, check server status, and manage the server (stop, start, and restart).

The web UI is built using Mantine v7.

## Getting Started

### Prerequisites

- Docker

### Building and Running

1.  **Clone the Repository:**

    ```sh
    git clone https://github.com/g3ncl/acc-server-web.git
    cd acc-server-web
    ```

2.  **Build the Docker Image:**

    ```sh
    docker build -t acc-server-web .
    ```

3.  **Run the Docker Container:**

**Important Security Note:** Ensure you only expose on the external network only the necessary ports for the ACC server and **do not** expose port 3000 for the webapp to the outside network. This is crucial for preventing unauthorized modification of your server configuration.

    ```sh
    docker run -p <WEB_UI_PORT>:<3000> <ACC_SERVER_PORT_UDP>:<ACC_SERVER_PORT_UDP> -p <ACC_SERVER_PORT_TCP>:<ACC_SERVER_PORT_TCP> -d acc-server-web
    ```

    Replace `<ACC_SERVER_PORT_1>` and `<ACC_SERVER_PORT_2>` with the actual ports used by your ACC server. Replace <WEB_UI_PORT> The local port where you want to access the web interface. Refer to the ACC documentation for the correct ports.

1.  **Access the Webapp:**

    Once the container is running, access the web configuration panel by navigating to `http://localhost:<WEB_UI_PORT>` in your web browser from a machine on the same network as the Docker host or using a VPN.

## Configuration

Server configuration files can be edited via the web interface. Changes are applied after restarting the ACC server through the webapp.

## Automated Builds

This repository includes GitHub Actions workflows that automatically build and publish the Docker container to GitHub Container Registry whenever changes are pushed to the main branch. You can pull the latest version of the container directly from the GitHub Container Registry using:

```sh
docker pull ghcr.io/g3ncl/acc-server-web:main
```

## Docker Compose (Optional)

You can also use Docker Compose to manage the application. Create a `docker-compose.yml` file:

```yaml
version: "3.8"
services:
  acc-server-web:
    image: ghcr.io/g3ncl/acc-server-web:latest
    ports:
      - "<WEB_UI_PORT>:<3000>"
      - "<ACC_SERVER_PORT_UDP>:<ACC_SERVER_PORT_UDP>"
      - "<ACC_SERVER_PORT_TCP>:<ACC_SERVER_PORT_TCP>"
```

Then run:

```sh
docker-compose up -d
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

This project is licensed under the GNU General Public License v2.0 - see the [LICENSE](LICENSE) file for details. GPL-2.0 ensures that this software remains free and open source, requiring any modifications or derivative works to be distributed under the same license terms.

## Disclaimer

This project is not associated with, endorsed by, or affiliated with KUNOS Simulazioni in any way.
