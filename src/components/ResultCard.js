import React from "react";
import axios from "axios";

const SentenceComponent = (props) => {
  return <div dangerouslySetInnerHTML={{ __html: props.sentence }}></div>;
};
export default class ResultCard extends React.Component {
  render() {
    const children = [];

    let number = 1;
    for (let i = 0; i < this.props.highlightedContent.length; i++)
      if (this.props.highlightedContent[i][0] !== "") {
        children.push(
          <div className="flex flex-row items-center my-2" key={i} name={i}>
            <div className="flex items-center justify-center mx-2">
              <div className="flex items-center justify-center text-xl text-white bg-purple-600 h-12 w-12 font-bold rounded-full shadow-md hover:shadow-lg">
                {number}
              </div>
            </div>
            <div className="w-full mx-2">
              <div>{this.props.highlightedContent[i][1]}</div>
              <div>{this.props.highlightedContent[i][2]}</div>
              <div>
                <SentenceComponent
                  sentence={this.props.highlightedContent[i][0]}
                />
              </div>
            </div>
          </div>
        );
        number++;
      }

    return (
      <div className="flex my-6 w-full shadow-lg bg-white rounded-lg">
        <div className="flex flex-col p-6 items-center justify-center text-white bg-purple-600 rounded-l-lg">
          <div className="mx-1 text-2xl font-semibold">Filename: </div>
          <div className="mx-2">{this.props.filename}</div>
        </div>
        <div className="flex flex-col p-6">
          <div className="flex items-center flex-row my-2">
            <div className="mx-1 text-xl font-semibold">Date: </div>
            <div className="mx-2">{this.props.date}</div>
          </div>
          <div className="flex items-center flex-row my-2">
            <div className="mx-1 text-xl font-semibold">Keyword: </div>
            <div className="mx-2">{this.props.keyword}</div>
          </div>
          <div className="p-1">
            <div className="my-2">Result:</div>
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}
