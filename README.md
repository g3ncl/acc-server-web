# acc-server-web

acc-server-web is a Docker-based project that packages an Assetto Corsa Competizione (ACC) server running under Wine alongside a Next.js web application. The web UI lets you edit server configuration files, check server status, and manage the server (stop, start, and restart).

For the Assetto Corsa EVO version, see [ace-server-web](https://github.com/g3ncl/ace-server-web).

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
 docker run -p <WEB_UI_PORT>:<3000> \
 -p <ACC_SERVER_PORT_UDP>:<ACC_SERVER_PORT_UDP>/udp \
 -p <ACC_SERVER_PORT_TCP>:<ACC_SERVER_PORT_TCP>/tcp \
 -v acc-server-cfg:/app/acc-server/cfg \
 -v acc-server-results:/app/acc-server/results \
 -d acc-server-web
```

Replace `<ACC_SERVER_PORT_1>` and `<ACC_SERVER_PORT_2>` with the actual ports used by your ACC server. Replace <WEB_UI_PORT> The local port where you want to access the web interface. Refer to the ACC documentation for the correct ports.

1.  **Access the Webapp:**

Once the container is running, access the web configuration panel by navigating to `http://localhost:<WEB_UI_PORT>` in your web browser from a machine on the same network as the Docker host or using a VPN.

## Configuration

Server configuration files can be edited via the web interface. Changes are applied after restarting the ACC server through the webapp.

## Logs, entry lists and results

Logs shows recent ACC output and lets you download it with configured passwords redacted. Entry list edits ACC's `entrylist.json`, with JSON import/export. Save and restart ACC to apply entry-list changes.

Results lists session JSON files produced by ACC. Enable Dump Leaderboards in Configuration to write them. Persist `/app/acc-server/results` in a volume if you want results to survive container replacement.

Local paths can be overridden with `ACC_CONFIG_PATH`, `ACC_LOG_PATH` and `ACC_RESULTS_PATH`. The container defaults are `/app/acc-server/cfg`, `/app/wine.log` and `/app/acc-server/results`.

## Releases and container images

Push Conventional Commits directly to `main`. After checks pass, [semantic-release](https://github.com/semantic-release/semantic-release), run through the [Semantic Release Action](https://github.com/cycjimmy/semantic-release-action), automatically creates a release without pull requests.

`fix:` increments the patch version, `feat:` increments the minor version, and `feat!:` or `fix!:` increments the major version. Documentation and CI changes alone do not create a release. Use subjects of at most 100 characters without a commit body.

The workflow updates `package.json`, the lockfile and changelog, commits them with a short release message, and creates the Git tag and GitHub release. The UI reads its version from `package.json`. Docker's official actions publish full-version, major/minor and `latest` image tags. Builds from `main` remain available under `:main`.

The workflow uses the built-in `GITHUB_TOKEN` with write access to repository contents and GHCR packages. It does not publish to npm. Branch rules must allow the release bot to push its version commit to `main`. After a release, pull the bot's commit before your next push.

```sh
docker pull ghcr.io/g3ncl/acc-server-web:latest
```

## Docker Compose (Optional)

You can also use Docker Compose to manage the application. Create a `docker-compose.yml` file:

```yaml
version: "3.8"
services:
  acc-server-web:
    image: ghcr.io/g3ncl/acc-server-web:latest
    ports:
      - "<WEB_UI_PORT>:3000"
      - "<ACC_SERVER_PORT_UDP>:<ACC_SERVER_PORT_UDP>/udp"
      - "<ACC_SERVER_PORT_TCP>:<ACC_SERVER_PORT_TCP>/tcp"
    volumes:
      - acc-server-cfg:/app/acc-server/cfg
      - acc-server-results:/app/acc-server/results

volumes:
  acc-server-cfg:
  acc-server-results:
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
