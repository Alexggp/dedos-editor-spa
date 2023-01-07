import dedosInstance from '../../apis/dedosInstance';

export const deleteFile = async (fileName) => {
    try {
      const response = await dedosInstance.delete(`/files/${fileName}`)
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      // console.log(error)
      return;    
    }
};