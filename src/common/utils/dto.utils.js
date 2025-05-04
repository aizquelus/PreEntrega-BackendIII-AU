export const mapToDTO = (data, DTOClass) => {
    if (Array.isArray(data)) {
        return data.map(item => new DTOClass(item));
    }
    return new DTOClass(data);
}
