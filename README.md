# slack2pi
Notifications of CI build results with Slack, Raspberry Pi and Nodejs.

## Description

We configure our CI to send a notification to one channel of our Slack with a Slack App Webhook, when the channel receives the build result (success or failure), a Slack Custom Bot checks that the message comes from the CI and the result, now with the result, the Raspberry turn on a Red Led if it was failure and the Green Led if it was successful, also reproduce two different songs with tones from buzzer accordingly to the result received.

## Slack App

For Slack configuration you'll need to create an app on slack's api site:

[Slack Api](https://api.slack.com/)

After create it, add an Incoming Webhook, the option is on the left sidebar on Features. Turn On Activate Incoming Webhooks and some new information will be displayed, they'll give you a sample curl request after you add a new webhook to your workspace making click on the button there and selecting the channel that the webhook will be talking to.

So now you will have to use this webhook on your CI Configuration.

## CI Configuration

We use Drone-CI, so for this we used the slack-plugin that they offer and it is pretty simple.

[Drone-CI Slack Plugin](http://plugins.drone.io/drone-plugins/drone-slack/)

As you can see on the examples of how plugin works, it needs the Webhook URL to work and the configuration is very very simple. Of course, we used the webhook url as a secret like one of the examples.

Most of CI Systems offer one notification plugin or like drone, one slack notifications plugin ready to implement, so the only thing you need from your CI is the notificiation to a Slack Channel.

The next step is to create the bot that will read the notifications on the channel.

## Slack Bot

You can create a new bot user from this page and read some about them to know their features:

[Slack Api Bot Users](https://api.slack.com/bot-users)

After creating it you'll have an API Token, that will be used by the library we'll use to program the bot.

## Raspberry Installation
For the installation process I'll suppose you already have Raspbian running on your Raspberry Pi.

You'll need node and npm on your Raspberry, run this commands

`````
sudo apt-get install nodejs-legacy

sudo apt-get install npm
`````

## How to connect the Raspberry with the components

### Components

1. Raspberry Pi
2. Resistance 100 Ω
3. Resistance 330 Ω
4. Piezo (Buzzer)
5. Male-Female Jumpers
6. Male-Male Jumpers
7. Red Led
8. Green Led

### Circuit

![Circuit](https://github.com/NutriconsultorOnline/slack2pi/blob/master/Slack2piCircuit.png "slack2pi circuit")

## Programming

First, make a new folder, enter to it and run `npm init` this will create the package.json.

We are going to need this libraries:

[Slack-Node-Client](https://github.com/slackapi/node-slack-sdk) This library is used to manage the Slack Api with node and build our bot.

[Johnny-Five](http://johnny-five.io/) This library is used for controlling the GPIOs, it makes pretty easy to control them, the documentation is great and comes with examples. To install it run

`````
npm install johnny-five
`````

[Raspi-io](https://github.com/nebrius/raspi-io) This is an IO Plugin that provides support for the Raspberry Pi. To install it run

`````
npm install raspi-io
`````

[j5-songs](https://github.com/julianduque/j5-songs) This library is optional, we add it to play a little with a buzzer we find while doing this and implement it for fun. To install it run

````
npm install j5-songs
````

After installing the dependencies we are ready to code the bot.

In our index.js file you can find the code with the explanation of what are we doing in the comments.

After running the index.js file you are ready to go, push something to your CI and wait for the build to finish and watch the magic!

This project can be bigger, it is extremely scalable because the possibility of adding a lot of new features thanks to the extensive different modules that are available on the market for this boards, the different functionalities of Slack Bots, etc... Sky's the limit for this project! :D 

We made this project like this with little Leds just for testing, our real plan is to use bigger lights to mount them on the wall.

## Tested Raspberry Pi Boards

* Raspberry Pi 2 Model B v1.1

If you tested it and worked on another Raspberry Pi please make an issue to tell me to add it.