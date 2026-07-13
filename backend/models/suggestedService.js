class SuggestedService {
    constructor({serviceName,category,description,latitude,longitude,userId,userEmail}) 
    {
        this.serviceName = serviceName;
        this.category = category;
        this.description = description;

        this.coordinates = {
            latitude,
            longitude
        };

        this.userId = userId;
        this.userEmail = userEmail;

        this.status = "pending";
    }
}

export default SuggestedService;