export default function(photos = [], action) {
    if(action.type == 'addPicture') {
        return [...photos, action.picture]
    } else {
        return photos;
    }
}