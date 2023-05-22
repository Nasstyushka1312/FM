import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { createNewFolder, setVisibleDialogCreateFolder } from '../../../Actions/Actions.js';

class FormDialog extends Component {

    render() {
        const { handleClose, handleSave, value, open } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-create-folder" fullWidth={true} maxWidth={'sm'}>
                <form>
                  <DialogTitle id="form-dialog-create-folder">Создать папку</DialogTitle>
                  <DialogContent>
                    <TextField style={{color: "red!important", borderBottom: "red!important"}} autoFocus fullWidth margin="dense" label="Название папки" type="text" value={value} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} style={{color: "red"}} type="button">
                      Отменить
                    </Button>
                    <Button style={{color: "red"}} type="submit" onClick={handleSave}>
                      Сохранить
                    </Button>
                  </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        createFolderName: state.createFolderName,
        open: state.visibleDialogCreateFolder
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: event => {
            dispatch(setVisibleDialogCreateFolder(false));
        },
        handleSave: event => {
            event.preventDefault();
            const folderName = event.currentTarget.form.querySelector('input').value;
            dispatch(createNewFolder(folderName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
