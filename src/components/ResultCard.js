import React from "react";
import axios from "axios";

export default class ResultCard extends React.Component {
  constructor() {
    super();
    this.state = {
      filename: "",
      keyword: "",
      content: "",
      numberSpan: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/extract_information")
      .then((response) => {
        console.log(response);
        this.setState(response.data["result"]);
      });
  }

  render() {
    return (
      <div className="flex flex-col">
        <div className="flex items-center flex-row my-2">
          <div className="mx-1 text-xl font-semibold">Filename: </div>
          <div className="mx-2">{this.state.filename}</div>
        </div>
        <div className="flex items-center flex-row my-2">
          <div className="mx-1 text-xl font-semibold">Keyword: </div>
          <div className="mx-2">{this.state.keyword}</div>
        </div>
        <div className="p-1">
          <div className="my-2">Result:</div>
          <div className="p-4 shadow-md rounded-md">{this.state.content}</div>
        </div>
      </div>
    );
  }
}
