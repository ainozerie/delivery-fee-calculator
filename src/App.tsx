import React, { Component } from 'react'
import Calculator from './Calculator'
import Header from './Header'

export default class App extends Component {
  render() {
    return (
      <>
        <Header/>
        <main>
          <Calculator />
        </main>
      </>
    )
  }
}
