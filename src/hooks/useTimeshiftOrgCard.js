const useTimeshiftOrgCard = () => {
    const deleteOrgDataset = () => {
        console.log('Dataset deleted from your ORG.');
    };
    return {deleteOrgDataset: deleteOrgDataset};
};

export default useTimeshiftOrgCard;