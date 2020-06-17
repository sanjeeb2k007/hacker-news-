import React from   'react';
import './news-item.style.scss';
 
class NewsItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hidden: false,
            personvote: this.props.points
        };
    }

    handleHideComponent = (props) => {
        let newState = JSON.parse(JSON.stringify(this.state));
        let sessionStorageItem =JSON.parse( window.sessionStorage.getItem("isHidden")) || {};
        newState.hidden = true;
        this.setState(newState);
       sessionStorageItem[this.props['data-key']] = newState.hidden;
        window.sessionStorage.setItem("isHidden", JSON.stringify(sessionStorageItem));       
     }

     componentDidMount () {
       console.log(window.sessionStorage.getItem("isHidden"));
     }

     handleClick = props => async () => {
        const data_vote = {
          person_id: this.props['data-key'],
          person_vote: this.state.personvote + 1
        };
    
        const [{ vote }] = await this.getVotes(data_vote);
    
        this.setState({personvote:this.state.personvote + 1})
      };
    
      // Mock call
      getVotes = async data_vote => {
        return await [{}];
      };

    render() {
        return ( 
            
         <div className={`${this.state.hidden ? 'hidden' : ''} news-item`}> 
        <div className='content'>
            {this.props.num_comments ? <span>{this.props.num_comments}</span> : ''}
            <span className="upvote-btn" onClick={this.handleClick(this.props)}></span>
            {this.props.points ? <span>{this.state.personvote}</span> : ''}
            {this.props.title ? <span className='title'>{this.props.title}</span>: ''}
            <span className='url'>{this.props.url}</span>
            <span className='author'>{this.props.author}</span>
            <span className='date'>{new Date(`${this.props.created_at}`).toDateString()}</span>
            <span className='hide' onClick={this.handleHideComponent}>[hide]</span>
        </div>
    </div>
    )}

}

export default NewsItem;