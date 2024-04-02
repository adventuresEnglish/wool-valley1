import os

def update_filenames(folder_path):
    # List all files in the folder
    files = os.listdir(folder_path)
    
    # Iterate through each file
    for filename in files:
        # Check if the filename contains "adults"
        if "adult-youth" in filename:
            # Create the new filename by replacing "adults" with "adult_youth"
            new_filename = filename.replace("adult-youth", "adult_youth")
            
            # Construct the full paths for the old and new filenames
            old_path = os.path.join(folder_path, filename)
            new_path = os.path.join(folder_path, new_filename)
            
            # Rename the file
            os.rename(old_path, new_path)
            print(f"Renamed: {filename} -> {new_filename}")

# Specify the folder path where the files are located
folder_path = r"D:\wool-valley-slippers1\adult_youth"

# Call the function to update filenames in the folder
update_filenames(folder_path)

# import os

# def rename_files(folder_path):
#     # List all files in the folder
#     files = os.listdir(folder_path)
#     # Sort files to ensure consistent ordering
#     files.sort()

#     # Counter for file numbering
#     file_counter = 1
#     # Counter for folder numbering
#     folder_counter = 1

#     # Iterate through files
#     for filename in files:
#         # Get file extension
#         _, ext = os.path.splitext(filename)
#         # Check if the file is a photo (you can add more extensions if needed)
#         if ext.lower() in ['.jpg', '.jpeg', '.png', '.gif']:
#             # Generate new filename
#             new_filename = f"adults_{folder_counter:03d}_{file_counter}{ext}"
#             # Rename file
#             os.rename(os.path.join(folder_path, filename), os.path.join(folder_path, new_filename))
#             # Increment file counter
#             file_counter += 1
#             # If file counter reaches 4, reset it and increment folder counter
#             if file_counter == 4:
#                 file_counter = 1
#                 folder_counter += 1

# if __name__ == "__main__":
#     # Provide the path to the folder containing the photos
#     folder_path = r"D:\wool-valley-slippers1\adults"
#     # Call the function to rename files
#     rename_files(folder_path)