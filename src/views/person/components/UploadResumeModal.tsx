import { useDispatch } from 'react-redux';
import { message, Modal, Upload } from 'antd';
import { InboxOutlined  } from '@ant-design/icons';

interface UploadResumeModalProps {
  visible: boolean;
  onCancel: () => void;
}

function UploadResumeModal(props: UploadResumeModalProps) {
  const { visible, onCancel } = props;

  const dispatch = useDispatch();

  return (
    <Modal
      visible={visible}
      title="上传新的简历"
      footer={null}
      onCancel={onCancel}
    >
      <Upload.Dragger
        maxCount={1}
        customRequest={({ file, onSuccess, onError }) => {
          // console.log('custom upload:', file);
          // TODO: ajax 上传文件
          Promise.resolve()
            .then(result => {
              message.success('上传成功');
              onSuccess && onSuccess({ result });
              dispatch({
                type: 'user/updateInfo',
                payload: {
                  resumeUrl: 'https://orimi.com/pdf-test.pdf',
                }
              })
            })
            .catch(e => {
              onError && onError(e);
            })
        }}
      >
        <div className="text-gray-400 hover:text-blue-400">
          <p><InboxOutlined style={{ fontSize: '50px' }} /></p>
          <p>点击或拖拽上传简历文件</p>
        </div>
      </Upload.Dragger>
    </Modal>
  )
}

export default UploadResumeModal;
