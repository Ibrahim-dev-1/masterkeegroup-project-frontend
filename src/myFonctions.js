// import  React from 'react';
import { store } from 'react-notifications-component'



export function createNotification(title,type,message,container){
    return store.addNotification({
        title,
        container,
        message,
        type,
        insert: 'top',
        animationIn:["animated", "fadeIn"],
        animationOut:["animated", "fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
        }

    })
} 