import Appbase from "@/Layout/Appbase/Appbase";
import CreateBlogPostForm from "@/components/CreateBlogPostForm/CreateBlogPostForm";
import { createBlogPost } from "@/services/firebase";
import { ReactElement } from "react";
import { useMutation, useQueryClient } from "react-query";

const CreatePostPage = () => {
  const queryClient = useQueryClient();

  const { error, isLoading, mutate, data } = useMutation(createBlogPost, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("posts");
    },
  });
  return (
    <div>
      <CreateBlogPostForm
        onCreate={mutate}
        error={error}
        isLoading={isLoading}
        data={data}
      />
    </div>
  );
};

CreatePostPage.getLayout = function getLayout(page: ReactElement) {
  return <Appbase>{page}</Appbase>;
};

export default CreatePostPage;
