import React from "react";
import axios from "axios";

export default class ExtractionForm extends React.Component {
  state = {
    keyword: "",
    data: [],
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = async (event) => {
    event.preventDefault();

    const formInput = this.state;

    await axios
      .post("http://localhost:5000/api/search", formInput)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => console.log(e));

    this.props.onPost();
  };

  handleFolderChosen = (files) => {
    let data = [];
    Array.from(files).forEach((file) => {
      console.log(file.name);
      let fileReader = new FileReader();
      fileReader.readAsText(file);

      fileReader.onloadend = (e) => {
        const content = fileReader.result;
        let filedata = {
          filename: file.name,
          content: content,
        };
        data.push(filedata);
      };
    });
    console.log(data);
    this.setState({ data: data });
  };

  // Handling file input
  handleFileChosen = (file) => {
    let fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      const content = fileReader.result;
      this.setState({ filename: file.name, content: content });
    };
    fileReader.readAsText(file);
  };

  render() {
    const { keyword, content } = this.state;

    return (
      <form className="w-full" onSubmit={this.submitHandler}>
        <div className="flex">
          <div className="w-1/3 my-auto">
            <label className="block font-bold text-right">Keyword</label>
          </div>
          <div className="w-2/3">
            <input
              type="text"
              className="w-full border-gray-400 border rounded-md p-2 mx-3 text-sm"
              placeholder="Input keyword here"
              name="keyword"
              value={keyword}
              onChange={this.changeHandler}
            />
          </div>
        </div>
        <div className="flex align-middle justify-center p-5">
          <input
            directory=""
            webkitdirectory=""
            type="file"
            // onChange={(e) => this.handleFileChosen(e.target.files[0])}
            onChange={(e) => this.handleFolderChosen(e.target.files)}
          />
        </div>
        <button
          className="w-full bg-purple-500 p-2 mx-3 text-white rounded hover:shadow-md hover:bg-purple-400"
          type="submit"
        >
          Go!
        </button>
      </form>
    );
  }
}
