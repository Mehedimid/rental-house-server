import { ListingSchema } from "./listing.model";

const listingMiddleware = () => { 
    ListingSchema.pre('find', function (next) {
        this.find({ status: { $ne: "not available" } });
        next();
      })

      ListingSchema.pre('save', function (next) {
        if (this.isModified('title') && this.title) {
          this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
        }
        next();
      });
 }

 export default listingMiddleware