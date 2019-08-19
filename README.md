# Twitter-Light

<h2>Commands</h2>
<ul>
  <li>Load node modules: <code>$ npm install</code></li>
  <li>Run Tests: <code>$ npm test npm test --runInBand</code></li>
  <li>Run Program (local): <code>$ node app.js</code></li>
  <li>Build Program (docker): <code>$ docker build -t (username)/twitter-light .</code></li>
  <li>Run Program (docker): <code>$ docker run -p 8888:8888 -d (username)/twitter-light</code></li>
  <li>Connect to telnet: <code>$ telnet localhost 8888</code></li>
</ul>

<h2>Requirements</h2>
<ul>
  <li>Application must use telnet server for input and output</li>
  <li>Application must run as a docker image (no need to publish image though)</li>
  <li>Application must be developed using plain NodeJs or TypeScript (no third party
    libraries are allowed, except for testing purposes)</li>
  <li>User may submit commands to the application:
  Note: “posting”, “reading”, “following” and “wall” are not part of the command. All
  commands start with the name of a user
    <ul>
      <li>posting: (user) -> (message)</li>
      <li>reading: (user)</li>
      <li>following: (user) follows (another user)</li>
      <li>wall: (user) wall</li>
    </ul>
  </li>
  <li>Implement requirements focusing on writing the best code you can produce
  <li>Use public git repository (e.g. GitHub) to commit your solution and provide us with
  the URL to the repository within the agreed time
</ul>
