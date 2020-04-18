import React, { useRef, Component } from 'react';
import axios from 'axios';
import './assets/main.css';

export default class App extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      'result' : ''
    }
  }

  componentDidMount()
  {
    axios.get('http://localhost:5000/api/result')
      .then( response =>  {console.log(response)} )
      .catch( error => {console.log(error)} )
  }

  render()
  {
    // const file = useRef(null)

    return (
      <div class="bg-gray-100 min-h-screen">
        <nav class="flex items-center justify-between p-6 shadow-lg sticky">
          <div class="flex">
            <div class="text-xl font-bold text-indigo-400">
              Information Extraction
            </div>
          </div>
        </nav>
        <div class="container mx-auto my-6 p-6">
          <div class="flex p-5 shadow-lg rounded-lg bg-white">
            <div class="flex flex-col p-6 items-center justify-center w-1/2">
              <div class="font-semibold text-3xl text-center w-full">Welcome to Information Extractor!</div>
              <div class="text-md text-center w-full">Please input the keywords and file to be searched.</div>
            </div>
            <div class="flex flex-col p-5 items-center justify-center w-1/2">
              <form class="w-full">
                <div class="flex">
                  <div class="w-1/3 my-auto">
                    <label class="block font-bold text-right">Keyword</label>
                  </div>
                  <div class="w-2/3">
                    <input type="text" class="w-full border-gray-400 border rounded-md p-2 mx-3 text-sm" placeholder="Keyword" />
                  </div>
                </div>
                <div class="flex align-middle justify-center p-5">
                  {/* <input type="file" id="file" ref={file} class="hidden" /> */}
                  {/* <button class="bg-indigo-500 p-2 mx-3 text-white rounded hover:shadow-md hover:bg-indigo-600" onClick={() => file.current.click()}>Select a folder..</button> */}
                </div>
                <button class="w-full bg-indigo-500 p-2 mx-3 text-white rounded hover:shadow-md hover:bg-indigo-600">Go!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
