import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setVisibleDialogCopy, setSelectedFolderSublist, enterToPreviousDirectorySublist, copyItems } from '../../../Actions/Actions.js';
import FileListSublist from '../../FileList/FileListSublist/FileListSublist.jsx'; 
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

class FormDialog extends Component {

    render() {
        const { 
            selectedPath, handleClose, handleSave, open, 
            canGoBack, canCopy, selectedFiles, handleGoBack 
        } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-copy" fullWidth={true} maxWidth={'sm'}>
                <form>
                    <DialogTitle id="form-dialog-copy">
                        Копировать в <small style={{color: 'grey'}}>{ selectedPath.join('/') }</small>
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
                        <Button style={{color: "red"}} onClick={(e) => handleSave(e, selectedFiles)} disabled={!canCopy} type="submit">
                            Копировать
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    // prevent copying to same folder
    const canCopy = state.path.join('') !== state.pathSublist.join('') + (state.selectedFolderSublist ? state.selectedFolderSublist.name : '');

    return {
        open: state.visibleDialogCopy,
        selectedFolderSublist: state.selectedFolderSublist,
        selectedPath: state.selectedFolderSublist ? [...state.pathSublist, state.selectedFolderSublist.name] : [],
        canGoBack: state.pathSublist.length,
        canCopy: state.selectedFolderSublist && canCopy,
        selectedFiles: state.selectedFiles
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(setVisibleDialogCopy(false));
        },
        handleSave: (event, selectedFiles) => {
            dispatch(copyItems(selectedFiles));
        },
        handleGoBack: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(enterToPreviousDirectorySublist());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
