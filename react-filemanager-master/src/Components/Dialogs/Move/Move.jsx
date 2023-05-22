import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setVisibleDialogMove, setSelectedFolderSublist, enterToPreviousDirectorySublist, moveItems } from '../../../Actions/Actions.js';
import FileListSublist from '../../FileList/FileListSublist/FileListSublist.jsx'; 
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

class FormDialog extends Component {

    render() {
        const { 
            selectedPath, handleClose, handleSave, open, 
            selectedFiles, canGoBack, canMove, handleGoBack 
        } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-move" fullWidth={true} maxWidth={'sm'}>
                <form>
                    <DialogTitle id="form-dialog-move">
                        Переместить в <small style={{color: 'grey'}}>{ selectedPath.join('/') }</small>
                    </DialogTitle>
                    <DialogContent>
                        <FileListSublist />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleGoBack} style={{color: "red"}} type="button" disabled={!canGoBack}>
                            <KeyboardArrowLeftIcon /> Вернуться назад в каталог
                        </Button>

                        <Button onClick={handleClose} style={{color: "red"}} type="button">
                            Отменить
                        </Button>
                        <Button style={{color: "red"}} onClick={(e) => handleSave(e, selectedFiles)} disabled={!canMove} type="submit">
                            Переместить
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    // prevent moving to same folder
    const canMove = state.path.join('') !== state.pathSublist.join('') + (state.selectedFolderSublist ? state.selectedFolderSublist.name : '');

    return {
        open: state.visibleDialogMove,
        selectedFolderSublist: state.selectedFolderSublist,
        selectedPath: state.selectedFolderSublist ? [...state.pathSublist, state.selectedFolderSublist.name] : [],
        selectedFiles: state.selectedFiles,
        pathSublist: state.pathSublist,
        canGoBack: state.pathSublist.length,
        canMove: state.selectedFolderSublist && canMove
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(setVisibleDialogMove(false));
        },
        handleSave: (event, selectedFiles) => {
            dispatch(moveItems(selectedFiles));
        },
        handleGoBack: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(enterToPreviousDirectorySublist());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
