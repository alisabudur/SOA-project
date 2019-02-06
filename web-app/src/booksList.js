import React, { Component } from 'react';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';

class BooksList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            searchIsbn: '',
            foundBook: {},
            isResultVisible: false,
            noBookFoundMessage: '',
        };

        this.getData = this.getData.bind(this);
        this.handleSearchIsbnChange = this.handleSearchIsbnChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onAddToMyList = this.onAddToMyList.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        var cookies = new Cookies();
        var myToken = cookies.get("token");
        axios.get("https://localhost:44385/api/Books", { headers: { Authorization: "Bearer " + myToken} })
        .then(response => {
            this.setState({books: response.data});
        })
        .catch((error) => {
            console.log('error ' + error);
        });
    }

    onDelete(bookId, event){
        event.preventDefault();
        var cookies = new Cookies();
        var myToken = cookies.get("token");
        axios.delete("https://localhost:44385/api/Books/" + bookId, { headers: { Authorization: "Bearer " + myToken} })
        .then(response => {
            this.getData();
        })
        .catch((error) => {
            console.log('error ' + error);
        });
    }

    onSearch(event){
        event.preventDefault();
        var cookies = new Cookies();
        var myToken = cookies.get("token");
        axios.get("https://localhost:44385/api/ExternalBooks/" + this.state.searchIsbn, { headers: { Authorization: "Bearer " + myToken} })
        .then(response => {
            this.setState({foundBook: response.data});
            this.setState({isResultVisible: true});
            this.setState({noBookFoundMessage: ''});
        })
        .catch((error) => {
            console.log('error ' + error);
            this.setState({noBookFoundMessage: 'No results were found.'});
        });
    }

    onAddToMyList(event){
        event.preventDefault();
        var cookies = new Cookies();
        var myToken = cookies.get("token");
        axios.post("https://localhost:44385/api/Books/", this.state.foundBook, { headers: { Authorization: "Bearer " + myToken} })
        .then(response => {
            this.getData();
            this.setState({foundBook: {}});
            this.setState({isResultVisible: false});
        })
        .catch((error) => {
            console.log('error ' + error);
        });
    }

    handleSearchIsbnChange(event){
        this.setState({searchIsbn: event.target.value});
    }

    render(){
        const books = this.state.books;
        const bookItems = books.map((book) =>
            <li className="list-group-item">
                {book.title} - {book.author}

                <button 
                    type="button" 
                    className="close" 
                    onClick={this.onDelete.bind(this, book.id)}>
                    <span>&times;</span>
                </button>
            </li>
        );

        return (
            <div>
                <div className="row">
                    <label className="col-md-2"> Search a book:</label>
                    <input 
                        className="form-control col-md-4" 
                        type="text" 
                        value={this.state.searchIsbn} 
                        onChange={this.handleSearchIsbnChange}/>

                    <button 
                        className="btn btn-default col-md-1 offset-sm-1" 
                        onClick={this.onSearch}>
                        Search
                    </button>
                </div>
                <br/>
                <div className="row" style={{visibility: this.state.isResultVisible ? 'visible' : 'hidden'}}>
                    <label className="col-md-2">Search result:</label>
                </div>
                <div className="row" style={{visibility: this.state.isResultVisible ? 'visible' : 'hidden'}}>
                    <ul className="list-group col-md-12" >
                        <li className="list-group-item">
                            {this.state.foundBook.title} - {this.state.foundBook.author}
                            <button 
                                className="btn btn-default float-right" 
                                onClick={this.onAddToMyList}>
                                Add to my list
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <span className="text-danger">{this.state.noBookFoundMessage}</span>
                </div>
                <br/>
                <div className="row">
                    <label className="col-md-2">My books list:</label>
                </div>
                <div className="row">
                    <ul className="list-group col-md-12">{bookItems}</ul>
                </div>
            </div>
        );
    }
}

export default withCookies(BooksList);