import React, { Component } from "react";
import axios from "axios";
import "./assets/main.css";
import { ReactComponent as SearchImage } from "./assets/search.svg";
import ExtractionForm from "./components/ExtractionForm";
import ResultCard from "./components/ResultCard";

export default class App extends Component {
  constructor() {
    super();
    this.result = [];
    this.state = {
      hasPosted: false,
      hasFinishedLoading: false,
      toggleAbout: false,
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

  generateResult = async () => {
    const result = await axios
      .get("http://localhost:5000/api/extract_information")
      .then((response) => {
        const results = [];
        console.log(response);
        for (let i = 0; i < response.data.result.data.length; i++) {
          results.push(
            <ResultCard
              key={i}
              filename={response.data.result.data[i].filename}
              highlightedContent={
                response.data.result.data[i].highlightedContent
              }
              keyword={response.data.result.keyword}
              date={response.data.result.data[i].date}
            />
          );
        }
        console.log(results);

        this.result = results;
      })
      .finally(() => {
        this.setState({ hasFinishedLoading: true });
      });

    // this.result = result;
  };

  setHasPosted() {
    this.setState({
      hasPosted: true,
    });
    this.generateResult();
  }

  render() {
    return (
      <div className="bg-gray-100 min-h-screen">
        <nav className="flex p-6 shadow-lg sticky top-0 bg-white">
          <div className="flex w-full items-center justify-between">
            <div className="text-xl font-bold text-purple-600 hover:bg-purple-600 hover:text-white p-1">
              Information Extractor
            </div>
            <div
              className="text-xl font-bold text-purple-600 hover:bg-purple-600 hover:text-white p-1"
              onClick={() =>
                this.setState({ toggleAbout: !this.state.toggleAbout })
              }
            >
              {this.state.toggleAbout ? "Main" : "About"}
            </div>
          </div>
        </nav>
        <div className="container mx-auto my-6 p-6">
          <div className="flex w-full my-6 p-6 shadow-lg rounded-lg bg-white">
            {!this.state.toggleAbout ? (
              <div className="flex flex-col p-6 items-center justify-center w-1/2">
                <div className="p-4">
                  <SearchImage className="w-full h-full" />
                </div>
                <div className="font-semibold text-5xl text-center w-full leading-tight my-2">
                  Welcome to
                  <br /> Information Extractor!
                </div>
                <div className="text-md text-center w-full">
                  Please input the keywords and file to be searched.
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-6 items-center justify-center w-1/2">
                <div className="p-4 w-1/2 h-1/2">
                  <img
                    src={require("./mypicture.jpg")}
                    alt="my pic"
                    className="rounded-full shadow-lg"
                  />
                </div>
                <div className="font-semibold text-4xl text-center w-full leading-tight my-2">
                  Matthew Kevin Amadeus
                </div>
                <div className="font-medium text-xl text-center w-full leading-tight my-2">
                  13518035
                </div>
                <div className="text-md text-center w-full">
                  This project was created to fulfill the requirements of the
                  Strategi Algoritma class.
                </div>
              </div>
            )}
            <div className="flex flex-col p-5 items-center justify-center w-1/2">
              <ExtractionForm onPost={this.setHasPosted.bind(this)} />
            </div>
          </div>
          <div>{this.state.hasFinishedLoading ? this.result : null}</div>
        </div>
      </div>
    );
  }
}
