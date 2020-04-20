import React, { useRef, Component } from "react";
import axios from "axios";
import "./assets/main.css";
import { ReactComponent as SearchImage } from "./assets/search.svg";
import ExtractionForm from "./components/ExtractionForm";
import ResultCard from "./components/ResultCard";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      hasPosted: false,
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/keyword").then(
      (e) => {
        console.log(e);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  setHasPosted() {
    this.setState({
      hasPosted: true,
    });
  }

  render() {
    return (
      <div className="bg-gray-100 min-h-screen">
        <nav className="flex items-center justify-between p-6 shadow-lg sticky">
          <div className="flex">
            <div className="text-xl font-bold text-purple-500">
              Information Extraction
            </div>
          </div>
        </nav>
        <div className="container mx-auto my-6 p-6">
          <div className="flex w-full my-6 p-6 shadow-lg rounded-lg bg-white">
            <div className="flex flex-col p-6 items-center justify-center w-1/2">
              <div className="p-4">
                <SearchImage width="100%" height="100%" />
              </div>
              <div className="font-semibold text-5xl text-center w-full leading-tight my-2">
                Welcome to
                <br /> Information Extractor!
              </div>
              <div className="text-md text-center w-full">
                Please input the keywords and file to be searched.
              </div>
            </div>
            <div className="flex flex-col p-5 items-center justify-center w-1/2">
              <ExtractionForm onPost={this.setHasPosted.bind(this)} />
            </div>
          </div>
          <div className="flex my-6 p-6 w-full shadow-lg bg-white rounded-lg">
            <div>{this.state.hasPosted ? <ResultCard /> : null}</div>
            {/* <ResultCard /> */}
          </div>
        </div>
      </div>
    );
  }
}
