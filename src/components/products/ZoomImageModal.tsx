import { getImageRotations } from '@/helper/getImageRotations';
import CloseIcon from '@/icons/error/CloseIcon';
import productStates from '@/states/product/productStates';
import { getAdImageBySize } from '@/utils/getImageBySize';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Image, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageZoomModal = () => {
    const product = toJS(productStates.selectedProduct);
    const imgUrls: any = productStates.selectedProduct?.images.map((img: any) => {
        return {
            url: getAdImageBySize('lg', productStates.selectedProduct?.id, img),
        };
    });

    return (
        <Modal visible={productStates.showZoomImageModal} transparent={true}>
            <TouchableOpacity
                onPress={() => productStates.setShowZoomImageModal(false)}
                style={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    zIndex: 999999,
                }}
            >
                <CloseIcon style={{ color: '#fff', width: 30, height: 30 }} />
            </TouchableOpacity>
            <ImageViewer
                imageUrls={imgUrls}
                renderImage={(props) => {
                    return (
                        <Image
                            source={{ uri: props.source.uri }}
                            style={{
                                width: '100%',
                                height: '100%',
                                transform: getImageRotations(product as any),
                                resizeMode: 'contain',
                            }}
                        />
                    );
                }}
            />
        </Modal>
    );
};

export default observer(ImageZoomModal);
