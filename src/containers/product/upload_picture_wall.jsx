import React, { Component } from 'react'
import { Upload, Modal, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {BASE_URL} from '../../config/config'
import {reqRemovePicture} from '../../api/index'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
    //   {
    //     uid: '-2',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-3',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-4',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-xxx',
    //     percent: 50,
    //     name: 'image.png',
    //     status: 'uploading',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   },
    //   {
    //     uid: '-5',
    //     name: 'image.png',
    //     status: 'error',
    //   },
    ],
  };

  getImgsNameArr = () => {
    let result = []
    this.state.fileList.forEach((item) => {
        result.push(item.name)
    
    })
    return result
  }

  setFileList = (imgArr) => {
    let fileList = []
    imgArr.forEach((item, index) => {
      fileList.push({uid: -index, status: 'done', name: item, url: `http://localhost:4000/upload/${item}`})
      
    })
    this.setState({fileList})
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async({file, fileList }) => {
    if(file.status === 'done'){
      console.log(file.response.data.url);
        fileList[fileList.length-1].url = file.response.data.url
        fileList[fileList.length-1].name = file.response.data.name
    }

    if(file.status === 'removed'){
        let {status} = await reqRemovePicture(file.name)
        if(status === 0){
            message.success('????????????', 1)
        }
        else message.error('????????????', 1)
    }



    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`}
          method="post"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
