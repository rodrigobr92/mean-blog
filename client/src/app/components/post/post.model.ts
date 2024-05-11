export interface PostItem {
  _id: string;
  title: string;
  content: string;
  image?: File;
  imagePath?: string;
  createdDate: Date | string;
  updatedDate: Date | string;
}
