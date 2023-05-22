import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FileListEmptyMessage.css';

class FileListEmptyMessage extends Component {
    render() {
        return (
            <div className="FileListEmptyMessage" style={{background: "darkslategrey", color: "white"}}>
                В этой папке нет файлов
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileListEmptyMessage);


