from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from PIL import Image
from io import BytesIO

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        # Assuming 'image' is the name of the field in your form
        image_data = request.data.get('image')

        if not image_data:
            return Response({'error': 'No image data provided'}, status=status.HTTP_400_BAD_REQUEST)

        # You can directly process the image_data here without saving to a file
        try:
            # Use Pillow (PIL) to process the image data
            image = Image.open(image_data)
            
            print(image)
            
            image.save('image.jpg')
            # Convert the processed image back to bytes
            buffer = BytesIO()
            #image.save(buffer, format='JPEG')
            #image_bytes = buffer.getvalue()

            # Return the processed image data or do something else with it
            return Response(2, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)