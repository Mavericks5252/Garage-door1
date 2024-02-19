import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import { GiHomeGarage } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa";
import { VStack } from '@chakra-ui/react';


class App extends Component {
componentDidMount() {
    this.socket = io(); // 1. Handshake with the server
  }
onForwardPress = (event) => {
    event.stopPropagation();
    this.socket.emit('direction', 'forward'); // 2. Start rotation
  }
onBackwardPress = (event) => {
    event.stopPropagation();
    this.socket.emit('direction', 'backward'); // 2. Start rotation
  }
onRelease = (event) => {
    event.stopPropagation();
    this.socket.emit('direction', 'stop'); // 3. Stop rotation
  }

/*
	<button
          className="btn btn-up"
          onTouchStart={this.onForwardPress}
          onTouchEnd={this.onRelease}
          onTouchCancel={this.onRelease}
        >
          &#9651;
        </button>
        <button
          className="btn btn-down"
          onTouchStart={this.onBackwardPress}
          onTouchEnd={this.onRelease}
          onTouchCancel={this.onRelease}
          >
            &#9661;
          </button>

*/
render() {
    return (
	<ChakraProvider>
      <div className="App">
	<VStack
		spacing ={2}
		allign='stretch'
	>
	<IconButton
		fontSize='150px'
		w='150px'
		h='150px'
  		colorScheme='blue'
		icon={<GiHomeGarage />}
		onmouseentter={this.onForwardPress}
		onTouchStart = {this.onForwardPress}
		onTouchEnd={this.onRelease}
	/>
	<IconButton
		fontSize='150px'
		w='150px'
		h='150px'
		colorScheme='blue'
		icon={<FaLightbulb />}
		onTouchStart = {this.onBackwardPress}
		onTouchEnd={this.onRelease}
		onTouchCancel={this.onRelease}
	/>
	</VStack>
      </div>
      </ChakraProvider>
    );
  }
}
export default App;
