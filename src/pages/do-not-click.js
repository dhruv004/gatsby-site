import React from "react"
import { Link } from "gatsby"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"

const permissionsNames = [
    "geolocation",
    "notifications",
    "push",
    "midi",
    "camera",
    "microphone",
    "speaker",
    "device-info",
    "background-fetch",
    "background-sync",
    "bluetooth",
    "persistent-storage",
    "ambient-light-sensor",
    "accelerometer",
    "gyroscope",
    "magnetometer",
    "clipboard",
    "display-capture",
    "nfc"
  ]

const getAllPermissions = async () => {
    const allPermissions = []
    // We use Promise.all to wait until all the permission queries are resolved
    await Promise.all(
      permissionsNames.map(async permissionName => {
          try {
            let permission
            switch (permissionName) {
              case 'push':
                // Not necessary but right now Chrome only supports push messages with  notifications
                permission = await navigator.permissions.query({name: permissionName, userVisibleOnly: true})
                break
              default:
                permission = await navigator.permissions.query({name: permissionName})
            }
            console.log(permission)
            allPermissions.push({permissionName, state: permission.state})
          }
          catch(e){
            allPermissions.push({permissionName, state: 'error', errorMessage: e.toString()})
          }
      })
    )
    return allPermissions
  }

const notificationsProperties = {
    "title": "Picture Time",
    "body": "Time to look at some random pictures",
    "icon": "https://picsum.photos/200",
    "image": "https://picsum.photos/400",
    // A badge is an image we display
    // when there is not enough space to display the notification
    "badge": "https://picsum.photos/300/200",
    // Direction decides if the notification goes
    // from left to right, right to left or let the browser decide
    "dir": "ltr",
    // As part of the direct user experience we also have 
    // Audio- ....
    "silent": "",
    // ... sensorial
    "vibrate": [200, 100, 200],
}

export default class DoNotClickPage extends React.Component {
    constructor(){
        super();
        this.state = {
            notificationsAllowed: Notification.permission
        }
        navigator.permissions.query({name:'notifications'}).then(res => {
            res.onchange = ((e)=>{
              // detecting if the event is a change
              if (e.type === 'change'){
                // checking what the new permissionStatus state is
                const newState = e.target.state
                if (newState === 'denied') {
                  console.log('why did you decide to block us?')
                } else if (newState === 'granted') {
                  console.log('We will be together forever!')
                } else {
                  console.log('Thanks for reverting things back to normal')
                }
                this.setNotificationState(newState)
              }
            })
          })
    }
    async componentDidMount(){
        if (this.state.notificationsAllowed !== 'granted'){
            const permission = await Notification.requestPermission();
            console.log(permission);
        }
    }

    setNotificationState(notificationsAllowed){
        console.log('updated')
        this.setState({ notificationsAllowed })
    }

    render(){
        if(this.state.notificationsAllowed !== 'granted') return(<h1> This app can\'t work without notification bye </h1>)
        return (
            <Layout>
                <SEO title="Page two" />
                <h1>Hi from the second page</h1>
                <p>Welcome to page 2</p>
                <Link to="/">Go back to the homepage</Link>
            </Layout>
        )
    }
    
}
