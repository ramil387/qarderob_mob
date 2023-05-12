export const setImageName = (img: any,
    img_publish_date: string,
    i: number,
) => {
    const random = Math.round(Math.random() * 9999);
    return JSON.stringify({
        data: {
            uid: `rc${img_publish_date}`,
            name: `rc-upload-${img_publish_date}-${random + i
                }.${img.uri.split('.')[img.uri.split('.').length - 1]}`,
        }
    })
}