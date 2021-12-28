import { useDispatch, useSelector } from 'react-redux';
import { message, Modal, Upload } from 'antd';
import { InboxOutlined  } from '@ant-design/icons';
import service from '@/service';
import { GlobalState, UserInfoState } from '@/store/state';

interface UploadResumeModalProps {
  visible: boolean;
  onCancel: () => void;
}

function UploadResumeModal(props: UploadResumeModalProps) {
  const { visible, onCancel } = props;

  const dispatch = useDispatch();
  const userInfo = useSelector<GlobalState, UserInfoState>(state => state.userInfo);

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
          console.log('file:', file);
          service.uploadFile({
            file: file as File,
          })
          .then(res => {
            message.success('上传成功');
            onSuccess && onSuccess({ result: res.data })
            console.log('file url', res.data);
            return service.userUpdateInfo({
              ...userInfo,
              resumeUrl: res.data,
            } as any);
          })
          .then(res => {
            dispatch({type: 'user/updateInfo', payload: {
              ...userInfo,
              resumeUrl: res.data.resumeUrl,
            }});
          })
          .catch(e => {
            onError && onError(e);
          });
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
